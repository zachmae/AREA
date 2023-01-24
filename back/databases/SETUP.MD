# 0.1 Systemctl

To start the PostgreSQL service on Linux, you can use the following command:

`sudo systemctl start postgresql`

This command will start the PostgreSQL service on your Linux system. If you want to check the status of the service, you can use the following command:

`sudo systemctl status postgresql`

This command will show you if the PostgreSQL service is running or not.

# 0.2 Service

Alternatively, if your system uses the traditional SysV init system, you can use the following command to start the PostgreSQL service:

`sudo service postgresql start`

And to check the status:

`sudo service postgresql status`