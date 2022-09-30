const Contract = require('./ContractModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getContracts = async (req, res, next) => {
  try {
    const contracts = await Contract.find().sort({ createdAt: -1 });
    const count = await Contract.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no contract(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} contract(s)`,
      contracts
    );
  } catch (error) {
    next(error);
  }
};

const createContract = async (req, res, next) => {
  try {
    const contract = new Contract({ ...req.body });
    await contract.save();
    return responseHandler(res, 201, 'Account Successfully Created', contract);
  } catch (error) {
    next(error);
  }
};

const updateContract = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!contract)
      return next(new CustomError(404, 'Invalid ID provided for contract'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      contract
    );
  } catch (error) {
    next(error);
  }
};

const getContract = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findById(id);
    if (!contract)
      return next(
        new CustomError(404, "There's no contract with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      contract
    );
  } catch (error) {
    next(error);
  }
};

const deleteContract = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByIdAndDelete(id);
    if (!contract)
      return next(
        new CustomError(404, "There's no contract with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', contract);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContract,
  updateContract,
  getContracts,
  getContract,
  deleteContract,
};
