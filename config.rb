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

helpers do
  def breadcrumb_link(target, active, &block)
    link_to(target, class: (target == active ? 'active' : ''), &block)
  end
end

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = 'www.surefloat.com'
  s3_sync.region                     = 'us-west-2'
  s3_sync.aws_access_key_id          = 'REDACTED: Use .s3_sync file with info in it'
  s3_sync.aws_secret_access_key      = 'REDACTED: Use .s3_sync file with info in it'
  s3_sync.delete                     = true
  s3_sync.prefer_gzip                = false
  s3_sync.acl                        = 'public-read'
  s3_sync.encryption                 = false
  s3_sync.prefix                     = ''
  s3_sync.version_bucket             = false
end
