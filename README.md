# Blogging App Frontend Documentation

## table of Content

1.  Useful Links
2.  Overview
3.  Features
4.  Tech stack
5.  Prerequisites
6.  Start Commands
7.  Folder Structure
8.  Troubleshooting
9.  Deployment

### Troubleshooting

1.  <b>erasableSyntaxOnly</b> issue

- While defining the enum for gender, You can get this error:
- <p style="background-color:white;color:black">This syntax is not allowed when <b style="color:red">erasableSyntaxOnly</b> is enabled.</p>

- Solution
  - Go to tsconfig.app.json and find the property "erasableSyntaxOnly" and set it to false.
