const Koa = require('koa');

const app = new Koa();

app.use(ctx => {
	let output_unix = null;
	let output_natural = null;

	let path = ctx.path.slice(1).replace(/%20/g, ' ');

	if (result = Date.parse(path)) {
		output_unix = result / 1000;
		output_natural = path;
	} else if (/^[0-9]*$/.test(path)) {
		output_unix = path;
		output_natural = new Date(path * 1000).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'});
	}

	ctx.body = {
		unix: output_unix,
		natural: output_natural
	};
});

app.listen(3000);
