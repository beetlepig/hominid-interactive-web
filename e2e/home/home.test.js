import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe.serial('Home Route', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should not have any automatically detectable accessibility issues', async ({ page }) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('navigation header is visible', async ({ page, isMobile }) => {
		test.skip(isMobile);

		const menuList = page.getByRole('navigation');
		await expect(menuList).toBeInViewport();

		const homeIconLink = menuList.getByTitle('Home Icon');
		await expect(homeIconLink).toBeInViewport();

		const homeLink = menuList.getByRole('link', { name: 'Home', exact: true });
		await expect(homeLink).toBeInViewport();

		const aboutMeLink = menuList.getByRole('link', { name: 'About Me' });
		await expect(aboutMeLink).toBeInViewport();

		const skillsLink = menuList.getByRole('link', { name: 'Skills' });
		await expect(skillsLink).toBeInViewport();

		const projectsLink = menuList.getByRole('link', { name: 'Projects' });
		await expect(projectsLink).toBeInViewport();

		const contactLink = menuList.getByRole('link', { name: 'Contact' });
		await expect(contactLink).toBeInViewport();

		const changeLanguageButton = menuList.getByRole('button', { name: 'Change language' });
		await expect(changeLanguageButton).toBeInViewport();
	});

	test('should navigate to about me section', async ({ page, isMobile }) => {
		test.skip(isMobile);

		const menuList = page.getByRole('navigation');
		await expect(menuList).toBeInViewport();

		const aboutMeLink = menuList.getByRole('link', { name: 'About Me' });
		await expect(aboutMeLink).toBeInViewport();

		await aboutMeLink.click();

		await page.waitForURL('/#about-me');

		const aboutMeHeading = page.getByRole('heading', { name: 'I am a frontend developer' });
		await expect(aboutMeHeading).toBeInViewport();
	});

	test('should navigate to home section', async ({ page, isMobile }) => {
		test.skip(isMobile);

		await page.goto('/#about-me');

		const menuList = page.getByRole('navigation');
		await expect(menuList).toBeInViewport();

		const homeLink = menuList.getByRole('link', { name: 'Home', exact: true });
		await expect(homeLink).toBeInViewport();

		await homeLink.click();

		await page.waitForURL('/#home');

		const homeHeading = page.getByRole('heading', { name: 'Carlos Gomez' });
		await expect(homeHeading).toBeInViewport();
	});
});
