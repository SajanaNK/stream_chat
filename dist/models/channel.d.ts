import { ValidationResult } from "joi";
interface ChannelProps {
    id: string;
    title: string;
    description?: string;
}
declare class Channel {
    id: string;
    title: string;
    description?: string;
    constructor({ id, title, description }: ChannelProps);
    validateChannel(): ValidationResult;
}
export { Channel };
//# sourceMappingURL=channel.d.ts.map