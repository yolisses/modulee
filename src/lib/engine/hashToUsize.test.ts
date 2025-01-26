test('hashToUsize', () => {
	expect(hashToUsize('a')).toEqual(3826002220);
	expect(hashToUsize('b')).toEqual(3876335076);
	expect(hashToUsize('c')).toEqual(3859557456);
});
