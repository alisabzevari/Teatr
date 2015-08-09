using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.Configuration;
using Microsoft.Framework.Runtime;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

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

            string result = string.Empty;
            result = JsonConvert.DeserializeObject<string>("null"); //null, ok
            result = JsonConvert.DeserializeObject<string>("'value'"); //throwing error, expecting "value"
            result = JsonConvert.DeserializeObject<string>("''"); //throwing error, expecting string.empty
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
