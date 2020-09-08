import { prop, getModelForClass } from '@typegoose/typegoose';

class Schema {
	@prop({ unique: true, required: true })
	public dealId!: string;

	@prop()
	public date?: string;

	@prop()
	public orgId: string;

	@prop()
	public xml: string;

	@prop()
	public value: number;

	@prop({ default: false })
	public sentToBling?: boolean;
}

const DealSchema = getModelForClass(Schema);

export default DealSchema;
