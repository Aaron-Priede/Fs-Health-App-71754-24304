// using Gamestor.Api.Dtos;

namespace SimpleApi.Dtos;

public record class GameStore(
        int Id,
        string Name,
        string Description,
        string Genre,
        string Platform
    );
