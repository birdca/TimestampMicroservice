const send  = require('koa-send');
const Koa    = require('koa');
const Router = require('koa-router');

const app    = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
		await send(ctx, 'views/index.html');
	})
	.get('/:timestamp', ctx => {
		let output_unix    = null;
		let output_natural = null;

		let path = ctx.params.timestamp.replace(/%20/g, ' ');
    let result = null;
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

const PORT = process.env.PORT || 3000;
app.use(router.routes()).listen(PORT);
