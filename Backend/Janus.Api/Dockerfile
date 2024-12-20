FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS base
WORKDIR /app
COPY . .
RUN dotnet restore && dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine
WORKDIR /app
COPY --from=base /app/out .

ENTRYPOINT ["dotnet", "Janus.Api.dll"]