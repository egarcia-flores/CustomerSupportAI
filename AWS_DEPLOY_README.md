# Deploying a Next.js Application on AWS EC2 with Amazon Linux, Nginx, and PM2

## 1. Create AWS EC2 Instance
- Launch an EC2 instance from the AWS Management Console.
- Choose an Amazon Linux 2 AMI.
- Select an instance type (e.g., t2.micro for free tier).
- Configure instance details, storage, and tags as needed. I suggest the defaults.
- Configure security groups to allow:
  - HTTP (port 80) from 0.0.0.0/0
  - HTTPS (port 443) from 0.0.0.0/0
  - SSH (port 22) from your IP (optional for security).
- Launch the instance and download the key pair (.pem file).

## 2. Connect to EC2 Instance
- Open your terminal and connect via SSH:
  ```sh
  ssh -i /path/to/your-key.pem ec2-user@your-ec2-public-dns

## 3. Install Dependencies
- Update package lists and install necessary packages:
  ```sh
  sudo yum update -y
  sudo yum install -y git nginx nodejs npm

## 4. Clone Your Repository
- Navigate to your home directory and clone your repository:
  ``` sh
    cd ~
    git clone https://github.com/your-username/your-repo.git
    cd your-repo

## 5. Build and Start Your Application
- Install application dependencies and build your Next.js application:
  ``` sh
  npm install
  npm run build
- Start your application:
  ``` sh
  npm start

## 6. Configure Nginx
- Open the Nginx configuration file in Vim:
  ``` sh
  sudo vim /etc/nginx/nginx.conf
- Add the line `include /etc/nginx/sites-enabled/*;` within the `http` block.
- Save and exit Vim (`:wq`).

## 7. Set Up Nginx Site Configuration
- Create and edit the default site configuration:
  ``` sh
  sudo vim /etc/nginx/sites-available/default

- Add the following content:
  ``` sh
  server {
      listen 80;
      server_name _;

      location / {
          proxy_pass http://localhost:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }
  }

- Create a symbolic link to enable the site:
  ``` sh
  sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

## 8. Test and Restart Nginx
- Test the Nginx configuration:
  ``` sh
  sudo nginx -t
- Restart Nginx:
  ``` sh
  sudo systemctl restart nginx

## 9.  Install and Configure PM2
- Install pm2 globally:
  ``` sh
  sudo npm install -g pm2
- Start your application with pm2:
  ``` sh
  pm2 start npm --name "customer-support-ai" -- start
- Save the pm2 process list and enable startup script:
  ``` sh
  pm2 save
  pm2 startup
- Run the generated command to set up the pm2 startup script.

## Final Thoughts
- Access your application using the EC2 instance's public DNS address in your web browser.
- Your Next.js application should now be running and accessible, with Nginx proxying requests and pm2 ensuring the application runs continuously.


