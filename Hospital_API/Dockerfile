# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["Hospital_API.csproj", "./"]
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish "Hospital_API.csproj" -c Release -o /app/publish

# Stage 2: Create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# Install required packages for globalization support
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        locales \
        tzdata \
        libicu-dev \
    && rm -rf /var/lib/apt/lists/* \
    && locale-gen en_US.UTF-8

# Set environment variables
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8
ENV TZ=Asia/Ho_Chi_Minh
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
ENV DOTNET_RUNNING_IN_CONTAINER=true
ENV ASPNETCORE_URLS=http://+:8080

# Copy the published files and configuration
COPY --from=build /app/publish .
COPY ["appsettings.json", "appsettings.Development.json", "./"]

EXPOSE 8080

# Set the entry point
ENTRYPOINT ["dotnet", "Hospital_API.dll"] 