# KristianFJones/Docker-Volumer

This is a script that SSHes into the hosts in a markdown table, and creates the volumes listed in another Markdown table.

## Usage

Create two markdown files.

### Exmaple Volumes Table

```
|    Volume    |  NFS Server  |                          Path                          | Notes |
| :----------: | :----------: | :----------------------------------------------------: | :---: |
| NFSDownloads | 192.168.1.21 |  /mnt/site1.pool1/Site1.Pool1.Files/Files/JDownloader  |       |
|    AriaNG    | 192.168.1.21 | /mnt/site1.pool1/Site1.Pool1.Docker.KJDev1/Data/AriaNg |       |
```

### Example Hosts Table

```
| Hostname      |
| ------------- |
| 192.168.1.166 |
| 192.168.1.167 |
| 192.168.1.168 |
```
