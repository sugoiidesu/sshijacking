require 'json'
require 'cgi'


unless ARGV.length == 2 && ARGV[0] == '-u'
    puts "Penggunaan: ruby kukiurldecode.rb -u 'name1%5B%5D=val1&name2%5B%5D=val2'"
    exit(1)
end
# Data URL-encoded
url_encoded_data = ARGV[1]

# Decode URL-encoded data
decoded_data = CGI.unescape(url_encoded_data)

# Parse the decoded data into a JSON object
begin
    json_data = {}

    # Split the decoded data by '&' to get individual key-value pairs
    pairs = decoded_data.split('&')
    pairs.each do |pair|
    # Split each pair by '=' to get the key and value
    key, value = pair.split('=')

    # Check if the key already exists in the JSON object
    if json_data.key?(key)
        # If the key already exists and it's an array, append the value
        if json_data[key].is_a?(Array)
        json_data[key] << value
        else
        # If the key exists but it's not an array, convert it into an array and add the value
        json_data[key] = [json_data[key], value]
        end
    else
        # If the key doesn't exist, add it with the value
        json_data[key] = value
    end
    end

    # Print the JSON object
    datana = []

    for i in 0..json_data["nama[]"].length-1 do
        datana << "#{json_data['nama[]'][i]}=#{json_data['isi[]'][i]}"
    end

    result = datana.join(";")
    puts "\n\nyour cookie:\n#{result}"
    
rescue JSON::ParserError => e
    puts "Error occurred while parsing JSON data: #{e.message}"
end