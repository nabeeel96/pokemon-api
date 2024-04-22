import React from "react";
import styled from "styled-components";
import DynamicChart from "react-apexcharts";

const Container = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #1f1f1f;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #f44336;
  margin-bottom: 1.5rem;
  text-transform: capitalize;
`;

const SubTitle = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  margin-top: 2rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const ListItem = styled.li`
  font-size: 1.4rem;
  color: #ccc;
`;

const ChartContainer = styled.div`
  width: 45vw;
  margin: 2rem auto;
`;

const PokemonDetails = ({ pokemonDetail }) => {
  const { name, stats, abilities } = pokemonDetail;

  if (!stats || !abilities) {
    return <div>Error fetching Pokémon details</div>;
  }

  const chartOptions = {
    chart: {
      id: "stats-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: stats.map((stat) => stat.stat.name),
      labels: {
        style: {
          colors: "#fff",
          fontSize: "16px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
          fontSize: "16px",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
      },
    },
    colors: ["#f44336"],
    tooltip: {
      enabled: true,
      style: {
        fontSize: "1.2rem",
        backgroundColor: "#333",
        color: "#fff",
        borderRadius: "5px",
        padding: "10px",
      },
    },
  };

  const series = [{ name: "Stats", data: stats.map((stat) => stat.base_stat) }];

  return (
    <Container>
      <Title>{name} Details</Title>
      <SubTitle>Abilities</SubTitle>
      <List>
        {abilities.map((ability) => (
          <ListItem key={ability.ability.name}>{ability.ability.name}</ListItem>
        ))}
      </List>
      <SubTitle>Stats</SubTitle>
      <ChartContainer>
        <DynamicChart options={chartOptions} series={series} type="bar" />
      </ChartContainer>
    </Container>
  );
};

export default PokemonDetails;
