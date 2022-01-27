var path = require('path')

module.exports = {
    plugins: [
        require('postcss-sorting') ({
			order: [
				'custom-properties',
				'dollar-variables',
				'declarations',
				'at-rules',
				'rules',
			],
			'properties-order': 'alphabetical',
			'unspecified-properties-position': 'bottom',
		}),
        require('postcss-nested'),
        require('postcss-utilities'),
        require('postcss-short'),
        require('postcss-csso'),
        require('postcss-preset-env'),
        require('postcss-use'),
        require('postcss-modules'),
        require('postcss-autoreset'),
        require('postcss-initial')({
          reset: 'inherited'
        }),
        require('lost'),
        require('postcss-assets'),
        require('postcss-sprites'),
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        }),
    ]
}