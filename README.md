# Bug Tracker

## Table of Contents
1. [Overview](#Overview)
1. [Product Spec](#Product-Spec)
1. [Wireframes](#Wireframes)
2. [Schema](#Schema)

## Overview
### Description
Tracks bugs or issues that an organization has. 

### App Evaluation

- **Category:** Project Management
- **Mobile:** This app would be developed for both desktop and mobile. The web application should be mobile responsive.
- **Story:** Creates tickets and assigns them to users within an organization. Users should be able to modify and comment on tickets.
- **Market:** Any organization that would need a bug or issue tracker to aid it in management.
- **Habit:** Users could use this SaaS 24/7.
- **Scope:** First I would create single organizations for users and all users could see all tickets for their respective organization. Later, I could add groups to an organization so users could only see tickets within their own group rather than all tickets of their organization.

## Product Spec

### 1. User Stories (Required and Optional)

**Required Must-have Stories**

* User can create a new account
* User can login
* User can reset their password
* User can view all issues on the dashboard
* User can create issues
  * Includes: "Titles", "Description", "Deadline", "Assigned to", and "Status"
* User can view other users' profiles
* User can view and comment on issues
* User can view issues' "Title", "Assigned to", "Deadline", "Assigned by", "Issued on", "Status", and "Actions" (for editing and deleting issues)
* User can edit and delete their own comments on issues
* User can search for issues
* User can filter issues
* User can change how many issues they want to display with a dropdown
* User can view and edit their profile
  * Checkbox - Receive email notifications
  * Change password
  * Username
  * First and last name
  * Display name dropdown: Email, Username, First and last name
  * Address
  * Phone
  * Facebook link
  * Twitter link
  * LinkedIn link
  * About me
* Admin user can edit and delete issues
* Admin user can access User Management page
  * Invite new users by entering their email addresses
  * Display all users and their roles of the organization
* User can sign out

**Optional Nice-to-have Stories**

* Data charts displaying statistics on issues
  * "Tickets by Type", "Tickets by Priority", and "Tickets by Status"
* User can copy all issues
* User can download all issues in an Excel sheet
* User can download all issues in a PDF file
* User can hide and reveal columns in the issue table
* User can add attachments when creating a new issue
* User can add a profile picture
* User can sort by projects and projects' issues

### 2. Screen Archetypes

* Home
* Login 
* Register - User signs up or logs into their account
* Forgot Password
* Dashboard Screen - View and create issues
  * Allows admin user to edit and delete issues
* Issue Detail Screen - Display issue details and comments
  * Allows user to create comments
  * Allows admin user to edit and delete issue details and comments
* Profile Screen - View profile
  * Allows user to navigate to the Edit Profile Screen
  * User can click on link icons that open their socials on a new page
* Edit Profile Screen - Edit profile
* User Management Screen - View and invite other users to the organization
  * Allows admin user to view and invite other users via e-mail
  * Allows admin user to remove other users in the organization 

### 3. Navigation

**Tab Navigation** (Tab to Screen)

* Profile
* User Management
* Sign Out

**Flow Navigation** (Screen to Screen)

* Home Page (NOT Signed In)
   * Sign In
   * Register
* Home Page (Signed In)
   * Select Issue -> Issue Detail Page -> Edit Issue Page
   * Edit Issue
   * Delete Issue
   * New Issue
   * [Dropdown] Profile -> Profile Page -> Edit Profile Page
   * [Dropdown] User Management -> User Management Page -> Check & Send Page
   * [Dropdown] Sign Out -> Home Page (Signed Out)

## Wireframes
<img src="wireframe-1.png">
<img src="wireframe-2.png">
<img src="wireframe-3.png">

## GIF Demo?

## Schema 
[TBD]
### Models
[TBD]
### Networking
[TBD]