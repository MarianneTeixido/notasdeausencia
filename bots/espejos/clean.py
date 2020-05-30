import cv2
import os
import numpy as np

base_dir = os.path.dirname(__file__)
prototxt_path = os.path.join(base_dir + 'model_data/deploy.prototxt')
caffemodel_path = os.path.join(base_dir + 'model_data/weights.caffemodel')

model = cv2.dnn.readNetFromCaffe(prototxt_path, caffemodel_path)

for img_file in os.listdir('imgs'):
    image = cv2.imread('imgs/{}'.format(img_file))
    if image is None:
        continue
    (h, w) = image.shape[:2]
    mean = (image[:,:,0].mean(), image[:,:,1].mean(), image[:,:,2].mean())
    blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)), 1.0, (300, 300), mean)

    model.setInput(blob)
    detections = model.forward()

    confidences = [detections[0, 0, i, 2] for i in range(detections.shape[2])]
    #if any( map(lambda x: x>0.5, confidences)):
    if confidences[0] > 0.5:
        
        box = detections[0, 0, 0, 3:7] * np.array([w, h, w, h])
        (startX, startY, endX, endY) = box.astype("int")
        
        frame = image[startY:endY, startX:endX]
        if frame.shape[0] == 0 and frame.shape[1] == 0:
            continue
        #cv2.imshow('frame {}'.format(img_file), frame)
        cv2.imwrite('faces/{}'.format(img_file), cv2.resize(image, (800, 800)))

#cv2.waitKey(0)
#cv2.destroyAllWindows()
