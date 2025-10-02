<script>
	import { faDiscord, faReddit, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
	import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<p>
	Modulee is a modular synthesizer. It makes easy to create and share instruments and effects for
	music production. It is free and open source.
</p>
<p><a href="/privacy-policy">Privacy Policy</a></p>
<p><a href="/terms-of-use">Terms of Use</a></p>
<p><a href="https://github.com/yolisses0/modulee" target="_blank">Github</a></p>
<br />
<div>
	<div>You can contact me on:</div>
	<a
		class="flex items-center gap-1"
		href="https://www.reddit.com/user/yolisses/"
		rel="noopener noreferrer"
		target="_blank"
	>
		<Fa icon={faReddit} fw />
		Reddit: yolisses
	</a>
	<a
		class="flex items-center gap-1"
		href="mailto:yolisses0@gmail.com"
		rel="noopener noreferrer"
		target="_blank"
	>
		<Fa icon={faEnvelope} fw />
		Email: yolisses0@gmail.com
	</a>
	<a
		class="flex items-center gap-1"
		href="https://wa.me/5583993757502"
		rel="noopener noreferrer"
		target="_blank"
	>
		<Fa icon={faWhatsapp} fw />
		WhatsApp: +55 83 99375-7502
	</a>
	<a
		class="flex items-center gap-1"
		href="https://discord.gg/J9n2SuBe"
		rel="noopener noreferrer"
		target="_blank"
	>
		<Fa icon={faDiscord} fw />
		Discord: yolisses0
	</a>
	<div>GMT -03:00 (Brazil)</div>
</div>
