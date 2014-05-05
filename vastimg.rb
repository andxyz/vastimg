class Vastimg
  def initialize(options = {})
    # @redis = redis
    # @googleanalytics = googleanalytics
    add 'http://thechive.files.wordpress.com/2010/11/oprah-bees.gif'
    add 'http://0.media.collegehumor.cvcdn.com/62/46/cefeebdd838f92b7d8967eb854eb7bb1.gif'
  end

  def call(env)
    url = scrub(env['QUERY_STRING'])
    method = env['REQUEST_METHOD'].downcase
    if %[get].include?(method)
      send(method, url, env)
    else
      [405, {}, []]
    end
  end

  def get(url, env)
    case url

    when /^(https?|data):/
      # remember the url
      add url

      # give the people what they want
      if env['HTTP_USER_AGENT'] =~ /(Propane|Echofon)/
        [302, {'Location' => url}, []]
      else
        [
          200,
          {
            'Content-Type'  => 'text/html',
            'Cache-Control' => 'public, max-age=30'
          },
          File.open('index.html', 'rb')
        ]
      end
    else
      [302, {'Location' => "/"}, []]
    end
  end

  def add(url)
    # @redis.sadd('master', url)
    # @googleanalytics
  end

  def scrub(str)
    str.to_s.strip.gsub(/[\r\n\t\0]/, '').gsub('%0D', '')
  end
end
