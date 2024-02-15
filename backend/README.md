# VSZK
### Description

The VSZK is a website where the companies can find the best fitting softwares for themselves, and search from a great list. This repository contains its backend written in .NET 7.0. Under the developing process Objectum Oriented Programming was used, so it is easily expandable and modifiable. 

### Used softwares
* For database: SQL Server 2022 Express, SQL Server MAnagement Studio 2019
* For developing: Visual Studio Code, .NET 7.0 SDK from the following link:
```
  https://dotnet.microsoft.com/en-us/download
```

### To run the backend

You have to follow the steps below to run the backend in Visual Studio Code.

* First of all clone the repository with a git bash command:
```
git clone https://github.com/zolika2002z/vszk.git
```

* Open the project in VS Code, and add .NET Runtime Install Tool extension.

* Then run the following commands in the Terminal:
```
dotnet add package  Microsoft.IdentityModel.Tokens
```

```
dotnet tool install --global dotnet-ef
```

```
dotnet ef migrations add init
```

```
dotnet ef database update
```

* Now you can run the project with the following command still in the Terminal:
```
dotnet watch run
```
