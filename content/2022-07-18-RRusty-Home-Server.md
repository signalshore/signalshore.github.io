Title: RRusty; Home Server
Date: 2022-07-18
Tags: CS, Tech, HomeServer
Summary: A live record of my home-server journey and the learnings so far in this endeavour

This is just a brief summary of things. I will be creating larger/detailed posts about things later on.

# The Hardware.
- Primary Computer is a Raspberry Pi model 4; 8GB.
- Primary storage is a Seagate 5TB 2.5inch Drive
- Secondary storage Seagate 2Tb drive which is meant for critical off-site backups
- An additional 1TB Western Digital drive. I use this primarily for the seedbox set-up. This drive is too unreliable for any critical use case.
- A NetGear AC6850 router. This is a beast. I will probably run open-wrt on this.

# The Use-case(s)
The Raspberry Pi was bought purely out of FOMO. I did not have a plan as to what I would do with it, but I figured having a less power-hungry computer around would not harm me much.
I wanted this to try as many things as possible without much cost. This is something that would not be possible with my company-issued laptop.
## Inexpensive NAS
This was an obvious one. I needed a lot of storage space. I am starting to take photographs and I want to seed a couple of torrents. I also want to self-host my books and media collection. Moreover, plugging in an external HDD every time I needed storage was not the best solution. Having storage readily available was fun.

I also need a backup system. My google-drive is running out of space.

As of now, Im running a Samba share and a NFS share. The Samba share is read-only. The NFS is the main export. Its mounted on my work laptop. I can saturate my Wi-fi connection with it.

## Ad Blocker (pi-hole)
Pi-Hole is a DNS-server that also blocks ads. This is really fun. I see a lot less adds these days. Pi-Hole also has details logs about DNS queries being made over the network.

## Media Server
The server has a bunch of movies, documentaries, music and books on it. I want to be able to consume these without much effort and also serve these across the network.

For pictures, I will be running Piwigo. TODO

## Seeding
I have also setup qbittorrent on this box. I have dedicated about 2Tb to just seeding sci-hub torrents.

## VPN and Networking

I want to setup a system where I can ssh into my network from the outside world.
Im planning to set up Tailscale (it uses WireGuard). I need to understand how they work before I deploy them. There will be a blog about it.

As for VPN, I do not use any VPN currently, I'm yet to settle with one provider.

## Personal Cloud
I did set up NextCloud once on RRusty once. It was okay. I'm not a big fan of the whole personal-cloud thing. I feel that its too big for my use-case. The good thing is that NC does have mobile clients, which is absent for my NFS shares.

## Monitoring
For monitoring, I'm using netdata

