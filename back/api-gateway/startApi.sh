##
#
# 2. Start the API gateway
#
##


# Get IP public
ifconfig -a | grep -o "inet [0-9.]*" | tail -1 | grep -o "[0-9.]*" > config/ip.conf

# Start API gateway
node app.js
