const nn = require('node-notifier');
const nodemailer  = require("nodemailer");

/**
 * Foreach loop for async functions
 * @param {Array} array
 * @param {utils~asyncForEachCallback} callback
 * @returns {Promise<void>}
 */
async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

/**
 * @typedef {Object} Notification
 * @property {string} title
 * @property {string} message
 */

/**
 * Sends system notification
 * @param {Notification} notification
 */
function sendSystemNotification(notification) {
	new nn.NotificationCenter().notify(notification);
	new nn.NotifySend().notify(notification);
	new nn.WindowsToaster().notify(notification);
	new nn.WindowsBalloon().notify(notification);
	new nn.Growl().notify(notification);

}


// async..await is not allowed in global scope, must use a wrapper

function sMail(mailtext) {
  
  console.log('Trying send email: ' + mailtext);
  var transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "your@gmail.com",
    pass: "blabla"
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }  
    
  });

  var mailOptions = {
    from: 'your@gmail.com',
    to: 'your@your',
    subject: 'WON',
    text: mailtext
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}



module.exports = {
	asyncForEach,
	sendSystemNotification,
  sMail
};

/**
 * The callback that will be called with each value in array
 * @callback utils~asyncForEachCallback
 * @param {*} value
 * @param {number} index
 * @param {Array} array
 */
