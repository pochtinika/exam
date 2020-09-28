const { Schema, model } = require("mongoose");

const schema = Schema(
	{
		description: {
			type: String,
			trim: true,
			required: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		brand: {
			type: String,
			trim: true,
			uppercase: true,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
			max: 5,
			min: 1,
			required: true,
		},
		coreNumber: {
			type: Number,
			required: true,
		},
		preview: {
			type: String,
			trim: true,
			required: true,
		},
		images: [
			{
				type: String,
				trim: true,
			},
		],
		screen: {
			type: String,
			trim: true,
		},
		processor: {
			type: String,
			trim: true,
		},
		ram: {
			type: String,
			trim: true,
		},
		ramSize: {
			type: Number,
			required: true,
		},
		os: {
			type: String,
			trim: true,
		},
		color: {
			type: String,
			trim: true,
		},
		keyboard: {
			type: String,
			trim: true,
		},
		hardDrive: {
			type: String,
			trim: true,
		},
		battery: {
			type: String,
			trim: true,
		},
		weight: {
			type: String,
			trim: true,
		},
		gpu: {
			type: String,
			trim: true,
		},
		ports: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const Laptop = model("Laptop", schema);

module.exports = Laptop;
