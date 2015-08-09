using System.Linq;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.Configuration;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNet.StaticFiles;
using Microsoft.AspNet.FileProviders;
using Microsoft.Framework.Runtime;

namespace Teatr
{
    public class Startup
    {
        private Options Options { get; set; }

        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            var builder = new ConfigurationBuilder(appEnv.ApplicationBasePath)
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();

            Options = ConfigurationBinder.Bind<Options>(builder.Build());
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton((serviceProvider) => Options);
            services.AddMvc().Configure<MvcOptions>(options =>
            {
                var jsonFormatter = options.OutputFormatters.OfType<JsonOutputFormatter>().First();

                jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });
        }

        public void Configure(IApplicationBuilder app)
        {
            var root = Options.ClientRoot;
            app.UseErrorPage();
            app.UseMvc();
            var fileServerOptions = new FileServerOptions()
            {
                FileProvider = new PhysicalFileProvider(root)
            };
            app.UseFileServer(fileServerOptions);
        }
    }
}
