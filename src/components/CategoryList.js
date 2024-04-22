import React from "react";
import styled from "styled-components";
import { MotionDiv } from "./MotionDiv";
import Link from "next/link";

const StyledPokemonList = styled(MotionDiv)`
  .pokemon-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 3rem;
  }

  .pokemon-item {
    height:40px;
    width: calc(25% - 1rem);
    margin-bottom: 1rem;
    text-align: center;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .pokemon-item:hover {
    transform: translateY(-5px);
  }

  .pokemon-name {
    font-weight: bold;
    color: #333333;
    font-size: 1.2rem;
    line-height: 1.5;
    text-align: center;
    cursor: pointer;
    padding: 1rem;
  }

  .pokemon-name:hover {
    color: #f44336;
  }
`;

const CategoryList = ({ categories, index }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <StyledPokemonList
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.25,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
    >
      <div className="pokemon-container">
        {categories?.map((category) => (
          <div className="pokemon-item" key={category.name}>
            <Link href={`/category/${category.name}`}>
              <span className="pokemon-name">{category.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </StyledPokemonList>
  );
};

export default CategoryList;
