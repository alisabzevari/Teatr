using System.Linq;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.Configuration;
using Newtonsoft.Json.Serialization;
using Microsoft.Dnx.Runtime;

namespace Teatr
{
    public class Startup
    {
        private IConfiguration Configuration { get; set; }

        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            var builder = new ConfigurationBuilder(appEnv.ApplicationBasePath)
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton((serviceProvider) => ConfigurationBinder.Bind<Options>(Configuration));
            services.AddMvc().Configure<MvcOptions>(options =>
            {
                var jsonFormatter = options.OutputFormatters.OfType<JsonOutputFormatter>().First();

                jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseErrorPage();
            app.UseMvc();
        }
    }
}
