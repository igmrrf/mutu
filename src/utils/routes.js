const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { errorMiddleware } = require('../middlewares/error');
const expresStatusMonitor = require('express-status-monitor');
const cookieParser = require('cookie-parser');
const statusMonitor = require('../config/status');
const RootRoute = require('../utils/routeRoute');
const AccessLogRoute = require('../containers/accesslog/AccessLogRoute');
const AttendanceRoute = require('../containers/attendance/AttendanceRoute');
const AuditRoute = require('../containers/audit/AuditRoute');
const BranchRoute = require('../containers/branch/BranchRoute');
const CardRoute = require('../containers/card/CardRoute');
const CategoryRoute = require('../containers/category/CategoryRoute');
const ClaimRoute = require('../containers/claim/ClaimRoute');
const ContactRoute = require('../containers/contact/ContactRoute');
const ContractRoute = require('../containers/contract/ContractRoute');
const CustomerRoute = require('../containers/customer/CustomerRoute');
const DisputeRoute = require('../containers/dispute/DisputeRoute');
const EODRoute = require('../containers/eod/EODRoute');
const ExpenseRoute = require('../containers/expense/ExpenseRoute');
const ExpenseReportRoute = require('../containers/expensereport/ExpenseReportRoute');
const InventoryRoute = require('../containers/inventory/InventoryRoute');
const InvoiceRoute = require('../containers/invoice/InvoiceRoute');
const MailRoute = require('../containers/mail/MailRoute');
const NoteRoute = require('../containers/note/NoteRoute');
const OrderRoute = require('../containers/order/OrderRoute');
const PaymentRoute = require('../containers/payment/PaymentRoute');
const PaymentMethodRoute = require('../containers/paymentmethod/PaymentMethodRoute');
const PlanRoute = require('../containers/plan/PlanRoute');
const ProductRoute = require('../containers/product/ProductRoute');
const ProjectRoute = require('../containers/project/ProjectRoute');
const PurchaseRoute = require('../containers/purchase/PurchaseRoute');
const QuoteRoute = require('../containers/quote/QuoteRoute');
const ReceiptRoute = require('../containers/receipt/ReceiptRoute');
const RecordRoute = require('../containers/record/RecordRoute');
const ReportRoute = require('../containers/report/ReportRoute');
const ShopOrderRoute = require('../containers/shoporder/ShopOrderRoute');
const ShopSettingRoute = require('../containers/shopsetting/ShopSettingRoute');
const StockItemRoute = require('../containers/stockitem/StockItemRoute');
const SubAccountRoute = require('../containers/subaccount/SubAccountRoute');
const SubscriberRoute = require('../containers/subscriber/SubscriberRoute');
const TerminalRoute = require('../containers/terminal/TerminalRoute');
const TransactionRoute = require('../containers/transaction/TransactionRoute');
const UserRoute = require('../containers/users/UserRoute');
// const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

module.exports = (app, logger) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(expresStatusMonitor(statusMonitor));
  app.use(express.json());
  app.use(cookieParser());
  app.use(helmet());
  app.use(cors());

  app.get('/', RootRoute);
  app.use('/api/v1/accesslog', AccessLogRoute);
  app.use('/api/v1/attendance', AttendanceRoute);
  app.use('/api/v1/audit', AuditRoute);
  app.use('/api/v1/branch', BranchRoute);
  app.use('/api/v1/card', CardRoute);
  app.use('/api/v1/category', CategoryRoute);
  app.use('/api/v1/claim', ClaimRoute);
  app.use('/api/v1/contact', ContactRoute);
  app.use('/api/v1/contract', ContractRoute);
  app.use('/api/v1/customer', CustomerRoute);
  app.use('/api/v1/dispute', DisputeRoute);
  app.use('/api/v1/eod', EODRoute);
  app.use('/api/v1/expense', ExpenseRoute);
  app.use('/api/v1/expensereport', ExpenseReportRoute);
  app.use('/api/v1/inventory', InventoryRoute);
  app.use('/api/v1/invoice', InvoiceRoute);
  app.use('/api/v1/mail', MailRoute);
  app.use('/api/v1/note', NoteRoute);
  app.use('/api/v1/order', OrderRoute);
  app.use('/api/v1/payment', PaymentRoute);
  app.use('/api/v1/paymentmethod', PaymentMethodRoute);
  app.use('/api/v1/plan', PlanRoute);
  app.use('/api/v1/product', ProductRoute);
  app.use('/api/v1/project', ProjectRoute);
  app.use('/api/v1/purchase', PurchaseRoute);
  app.use('/api/v1/quote', QuoteRoute);
  app.use('/api/v1/receipt', ReceiptRoute);
  app.use('/api/v1/recordupload', RecordRoute);
  app.use('/api/v1/report', ReportRoute);
  app.use('/api/v1/shoporder', ShopOrderRoute);
  app.use('/api/v1/shopsetting', ShopSettingRoute);
  app.use('/api/v1/stockitem', StockItemRoute);
  app.use('/api/v1/subaccount', SubAccountRoute);
  app.use('/api/v1/subscriber', SubscriberRoute);
  app.use('/api/v1/terminal', TerminalRoute);
  app.use('/api/v1/transaction', TransactionRoute);
  app.use('/api/v1/user', UserRoute);

  app.use(errorMiddleware);
};
