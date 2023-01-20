##
# This script
#
# 1. Start the services
# 2. Start the API gateway
# 3. (...)
#
##

# Start Services

## Start Services
cd services/
for delivery in */ ; do
    [ -L "${delivery%/}" ] && continue

    echo ${delivery}
    cd ${delivery}
    if [ -f "startService.sh" ]; then
        echo "Start ${delivery}"
        ./startService.sh &
    fi
    cd ..
done
cd ..


## Get IP public
#npm run ip
## Get PORT

# Start API gateway
cd api-gateway/
./startApi.sh &
cd ..

echo "Start API gateway"

## Get IP of services
## Get PORT of services
