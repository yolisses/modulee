export function downloadSomeFile() {
	// Create a JSON object
	const jsonData = {
		name: 'John Doe',
		age: 30,
		city: 'New York',
	};

	// Convert the JSON object to a string
	const jsonString = JSON.stringify(jsonData);

	// Create a Blob with the JSON data
	const blob = new Blob([jsonString], { type: 'application/json' });

	// Create a link element
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = 'data.json'; // The name of the file to be downloaded

	// Append the link to the body (required for Firefox)
	document.body.appendChild(link);

	// Programmatically click the link to trigger the download
	link.click();

	// Remove the link from the document
	document.body.removeChild(link);
}
