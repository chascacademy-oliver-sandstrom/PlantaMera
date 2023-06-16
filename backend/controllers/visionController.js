const path = require('path');
const vision = require('@google-cloud/vision');

// Create an absolute file path to serviceAccountKey.json
const keyFilename = path.join(__dirname, '..', 'serviceAccountKey.json');

// Create a Google Cloud Vision client
const client = new vision.ImageAnnotatorClient({
  keyFilename: keyFilename,
});

exports.analyzeImage = async (req, res) => {
  // Extract the image URI from the request
  const uri = req.body.uri;

  try {
    // Use the Vision API client to analyze the image
    const [result] = await client.textDetection(uri);
    const detections = result.textAnnotations;

    // For now, let's just send back all of the detected text
    res.json({
      message: 'Image analyzed successfully',
      data: detections,
    });
  } catch (err) {
    // Log the error and send back a 500 response
    console.error('Failed to analyze image: ', err);
    res.status(500).json({
      message: 'Failed to analyze image',
    });
  }
};
