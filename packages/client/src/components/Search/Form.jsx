import React, { useContext } from "react";
import { styled } from "@stitches/react";
import Label from "./Label";
import Popover from "./Popover";
import Select from "./Select";
import SearchContext from "../../context/SearchContext";
import Filter from "./Filter";
const Fieldset = styled("fieldset", {
  all: "unset",
  display: "flex",
  gap: 20,
  alignItems: "center",
});

const Form = () => {
  const { searchState, dispatch } = useContext(SearchContext);
  const changeSearchTerm = (e) => {
    dispatch({
      type: "updateSearchTerm",
      payload: { searchTerm: e.target.value },
    });
  };

  return (
    <div className=" grid text-neutral">
      <div className="form-control">
        <div className="input-group">
          <Popover
            content={
              <div className="flex flex-col gap-4">
                <span className="font-bold">Filters</span>
                <Fieldset>
                  <Label htmlFor="category">Category</Label>

                  <Select id="category" />
                </Fieldset>
                {Object.keys(searchState.filters).map((filter, index) => (
                  <Filter key={index} name={filter} />
                ))}
              </div>
            }
          />

          <input
            type="text"
            placeholder="search..."
            className="input
                         bg-white placeholder:italic max-w-xs"
            value={searchState.searchTerm}
            onChange={changeSearchTerm}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
