import { m } from '$lib/paraglide/messages.js';

const sections = {
	home: { name: m.menu_home(), href: '#home', id: 'home' },
	aboutMe: { name: m.menu_about_me(), href: '#about-me', id: 'about-me' },
	skills: { name: m.menu_skills(), href: '#skills', id: 'skills' },
	projects: { name: m.menu_projects(), href: '#projects', id: 'projects' },
	chat: { name: m.menu_chat(), href: '#chat', id: 'chat' },
	contact: { name: m.menu_contact(), href: '#contact', id: 'contact' }
};

export { sections };
