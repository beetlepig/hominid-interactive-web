import Content from './hover-card-content.svelte';
import Trigger from './hover-card-trigger.svelte';
import { LinkPreview as HoverCardPrimitive } from 'bits-ui';

const Root = HoverCardPrimitive.Root;

export {
	Root,
	Content,
	Trigger,
	Root as HoverCard,
	Content as HoverCardContent,
	Trigger as HoverCardTrigger
};
