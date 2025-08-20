const fs = require('fs');

function stripHtmlStyles(filePath) {
	let html = fs.readFileSync(filePath, 'utf8');

	// Remove <style> tags and their content
	html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

	// Remove style attributes except in table tags
	html = html.replace(/(<[^table][^>]*)\sstyle\s*=\s*["'][^"']*["']/gi, '$1');

	// Save the modified content back to the file
	fs.writeFileSync(filePath, html);
}

if (process.argv.length !== 3) {
	console.error('Usage: node strip_html_style.js <file_path>');
	process.exit(1);
}

stripHtmlStyles(process.argv[2]);
