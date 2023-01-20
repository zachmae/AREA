##
# This script
#
# 1. Start the services
# 2. Start the API gateway
# 3. (...)
#
##

# Get IP public
ifconfig -a | grep -o "inet [0-9.]*" | tail -1 | grep -o "[0-9.]*" > config/ip.conf

# Start Service
node server.js