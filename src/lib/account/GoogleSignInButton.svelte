<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div
	id="g_id_onload"
	data-client_id="725523345294-l7ljv04v2maac7k6ugu6ifmuut88gbjk.apps.googleusercontent.com"
	data-context="signin"
	data-ux_mode="popup"
	data-callback="onGoogleSignIn"
	data-close_on_tap_outside="false"
	data-itp_support="true"
></div>

<div
	class="g_id_signin"
	data-type="standard"
	data-shape="rectangular"
	data-theme="filled_blue"
	data-text="signin_with"
	data-size="large"
	data-logo_alignment="left"
></div>
