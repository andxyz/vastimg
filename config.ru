root = File.dirname(__FILE__)
$:.unshift(root)

# some options I guess, people seem to like those
options = {:opt1 => 'foo', :opt2 => 'bar'}

# serve some assets
use Rack::Static, :urls => ["/style.css", "/vastimg.bundled.js"], :root => "public"

# bring in the app
require 'vastimg'
run Vastimg.new(options)

