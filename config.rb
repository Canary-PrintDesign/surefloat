activate :livereload

ENV['WEBPACK_ENV'] ||= (build? ? 'build' : 'development')

activate :external_pipeline,
         name: :webpack,
         command: build? ?
         "WEBPACK_ENV=#{ENV.fetch('WEBPACK_ENV')} ./node_modules/webpack/bin/webpack.js --bail -p" :
         "WEBPACK_ENV=#{ENV.fetch('WEBPACK_ENV')} ./node_modules/webpack/bin/webpack.js --watch -d --progress --color",
         source: ".tmp/dist",
         latency: 1

set :css_dir,    'assets/styles'
set :js_dir,     'assets/scripts'
set :images_dir, 'assets/images'

activate :directory_indexes
