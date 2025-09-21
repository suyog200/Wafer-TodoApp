import mongoose from "mongoose";
export interface Task {
    name: string;
    description: string;
    status: "completed" | "incomplete";
    user: mongoose.Types.ObjectId;
}
declare const _default: mongoose.Model<Task, {}, {}, {}, mongoose.Document<unknown, {}, Task, {}, {}> & Task & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
