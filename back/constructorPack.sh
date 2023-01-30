##
# This script
#
# 1. Start the services
# 2. Start the API gateway
# 3. (...)
#
##

# Start API gateway
echo "Start API gateway"
cd api-gateway/
node app.js &
cd ..

# Start Services

## Start Services
echo "Start API Services"
cd services/
for delivery in */ ; do
    [ -L "${delivery%/}" ] && continue

    echo ${delivery}
    cd ${delivery}
    if [ -f "server.js" ]; then
        echo "Start ${delivery}"
        node server.js &
    fi
    cd ..
done
cd ..