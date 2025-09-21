// ADD THIS FUNCTION to agreement.controller.js if it's not already there
exports.askQuestion = async (req, res) => {
  try {
    const { agreementId } = req.params;
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ msg: 'A question is required.' });
    }

    const agreement = await Agreement.findById(agreementId);
    if (!agreement || agreement.ownerId.toString() !== req.user.id) {
        return res.status(404).json({ msg: 'Agreement not found or not authorized' });
    }

    // You will need to add the 'originalText' field to your Agreement model
    // and save the full text when you first upload the document.
    const answer = await aiService.getAnswer(question, agreement.originalText); 

    res.json({ answer });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};