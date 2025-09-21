const welcomeEmailService = require('../services/WelcomeEmailService');

class WelcomeEmailController {
  async sendWelcomeEmail(req, res) {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and message are required fields.'
        });
      }

      const result = await welcomeEmailService.sendWelcomeEmail({ name, email, message });
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Welcome email error:', error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong!'
      });
    }
  }
}

module.exports = new WelcomeEmailController();