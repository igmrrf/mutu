const { Schema, model, SchemaTypes } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const attendanceSchema = new Schema(
  {
    employees: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    branch: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

attendanceSchema.plugin(uniqueValidator, {
  message: '{PATH} is expected to be unique',
});

const Attendance = model('Attendance', attendanceSchema);
module.exports = Attendance;
