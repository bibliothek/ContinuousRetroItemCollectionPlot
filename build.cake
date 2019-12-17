#addin "Cake.Npm"

///////////////////////////////////////////////////////////////////////////////
// ARGUMENTS
///////////////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");

///////////////////////////////////////////////////////////////////////////////
// SETUP / TEARDOWN
///////////////////////////////////////////////////////////////////////////////

Setup(ctx =>
{
   // Executed BEFORE the first task.
   Information("Running tasks...");
});

Teardown(ctx =>
{
   // Executed AFTER the last task.
   Information("Finished running tasks.");
});

///////////////////////////////////////////////////////////////////////////////
// TASKS
///////////////////////////////////////////////////////////////////////////////

Task("Default")
.Does(() => {
   Information("Hello Cake!");
});

Task("Npm-Install")
   .Does(() => {
      var settings = new NpmInstallSettings();
      NpmInstall(settings);
   });

Task("Angular-Build")
   .IsDependentOn("Npm-Install")
   .Does(() => {
      NpmRunScript("build");
   });

Task("Angular-Test")
   .IsDependentOn("Npm-Install")
   .Does(() => {
      NpmRunScript("test");
   });


RunTarget(target);