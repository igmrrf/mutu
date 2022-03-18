const { errorHandler, responseHandler } = require('../utils/handlers');
const escpos = require('escpos');
escpos.USB = require('escpos-usb');

const device = new escpos.USB();
const options = { encoding: 'GB18030' };
const printer = new escpos.Printer(device, options);

const print = (req, res) => {
  const receipt = req.body;
  const username = req.user.name;
  const {
    header: {
      company,
      address: { street, city, state, zipcode, country },
      phone,
      email,
      site,
      customerName,
      userId,
      orderRef,
      tellerId,
      bankName,
      receiptRef,
      created,
    },
    mid: { cartItems, amount, amountPaid, taxAmount, amountAfterTax, status },
    footer,
    reprint,
  } = receipt;

  device.open((error) => {
    if (!error) {
      printer
        .font('A')
        .align('CT')
        .style('BU')
        .size(1, 1)
        .text(company)
        .align('CT')
        .text(`${street}, ${city}, ${state}`)
        .align('CT')
        .text(`Tel: ${phone} | email: ${email}`)
        .align('CT')
        .drawLine()
        .align('LT')
        .text(`Customer: ${customerName}`)
        .text(`Order Reference#: ${orderRef.split(' - ')[1]}`)
        .text(`Pay Method: ${bankName}`)
        .text(`Teller Id: ${tellerId}`)
        .text(`Date: ${created}`)
        .newLine()
        .tableCustom([
          { text: 'Product', width: 0.55, align: 'LEFT' },
          { text: 'Qty', width: 0.15, align: 'RIGHT' },
          { text: 'Price', width: 0.15, align: 'RIGHT' },
          { text: 'Amount', width: 0.15, align: 'RIGHT' },
        ]);
      cartItems.forEach((item) => {
        printer.tableCustom([
          { text: item.name, width: 0.55, align: 'LEFT' },
          { text: item.qty, width: 0.15, align: 'RIGHT' },
          { text: item.price, width: 0.15, align: 'RIGHT' },
          { text: item.amount, width: 0.15, align: 'RIGHT' },
        ]);
      });
      const change = parseInt(amountAfterTax, 10) - parent(amountPaid, 10);
      printer
        .align('CT')
        .text(`SubTotal: ${amount}`)
        .text(`Tax: ${taxAmount}`)
        .text(`Total After Tax: ${amountAfterTax}`)
        .text(`Change: ${change}`)
        .drawLine()
        .align('CT')
        .text(footer)
        .text(`Served By: ${username}`)
        .align('LT')
        .qrimage('https://fidowater.ng', (err) => {
          this.newLine();
          this.cut();
          this.close();
        });
      return responseHandler(200, 'Receipt Printed');
    } else {
      errorHandler(500, `Error Opening Printing Device: ${error}`);
    }
  });
};

module.exports = print;
