const contactService = require('../services/ContactService');

class ContactController {
  async submitContactForm(req, res) {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and message are required fields.'
        });
      }

      const result = await contactService.sendContactEmail({ name, email, message });
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong!'
      });
    }
  }
}

module.exports = new ContactController();