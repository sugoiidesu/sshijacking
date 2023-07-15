require 'json'
require 'cgi'


unless ARGV.length == 2 && ARGV[0] == '-u'
    puts "ruby kukiurldecode.rb -u '[url_encode_data]"
    exit(1)
end
url_encoded_data = ARGV[1]

decoded_data = CGI.unescape(url_encoded_data)

begin
    json_data = {}

    pairs = decoded_data.split('&')
    pairs.each do |pair|
    key, value = pair.split('=')

    if json_data.key?(key)
        if json_data[key].is_a?(Array)
        json_data[key] << value
        else
        json_data[key] = [json_data[key], value]
        end
    else
        json_data[key] = value
    end
    end

    datana = []

    for i in 0..json_data["nama[]"].length-1 do
        datana << "#{json_data['nama[]'][i]}=#{json_data['isi[]'][i]}"
    end

    result = datana.join(";")
    puts "\n\nyour cookie:\n#{result}"
    
rescue JSON::ParserError => e
    puts "Error occurred while parsing JSON data: #{e.message}"
end